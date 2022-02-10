import {useContext, useEffect, useState} from 'react';
import {appId, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const useMedia = (myFilesOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update, user} = useContext(MainContext);
  const loadMedia = async (start = 0, limit = 20) => {
    setLoading(true);
    try {
      /*
      let json = await useTag().getFilesByTag(appId);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          // console.log(mediaData);
          return mediaData;
        })
      );
      setMediaArray(media);
      // console.log(mediaArray);
      media && setLoading(false);
       */

        const response = await fetch(
          `${baseUrl}media?start=${start}&limit=${limit}`
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }
        let json = await response.json();
          if (myFilesOnly) {
           // filter files belonging to the current user
          json = json.filter((file) => {
            return file.user_id === user.user_id
           })

          }
        const media = await Promise.all(
          json.map(async (item) => {
            const response = await fetch(baseUrl + 'media/' + item.file_id);
            const mediaData = await response.json();
            // console.log(mediaData);
            return mediaData;
          })
        );
        setMediaArray(media);
        // console.log(mediaArray);
        setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // Call loadMedia() only once when the component is loaded
  // Or when the update state (MainCOntext)
  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia= async (formData, token) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': ',ultipart/form-data',
      },
      body: formData,
    };

    const result = await await doFetch(baseUrl + 'media', options);
    /*if (result) {
      setLoading(false);
    }*/
    result && setLoading(true);
    return result;
  };
  const putMedia = async (data, token, fileId) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + `media/${fileId}`, options);
  };

  const deleteMedia = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {'x-access-token': token},
    };
    return await doFetch(`${baseUrl}users/${fileId}`, options);
  };

  return {mediaArray, postMedia, loading, putMedia, deleteMedia};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'login', options);
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(baseUrl + 'users/user', options);
  };

  const getUserById = async (userId, token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(`${baseUrl}users/${userId}`, options);
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    const result = await doFetch(baseUrl + 'users/username/' + username);
    return result.available;
  };

  return {getUserByToken, getUserById, postUser, checkUsername, putUser};
};

const useTag = () => {
  const postTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };

  const getFilesByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };

  return {postTag, getFilesByTag};
};

const useFavourite = () => {
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({file_id: fileId}),
    };
    return await doFetch(`${baseUrl}favourites`, options);
  };
  const getFavouritesByFileId = async (fileId) => {
    return await doFetch(`${baseUrl}favourites/file/${fileId}`);
  };
  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(`${baseUrl}favourites/file/${fileId}`, options);
  };
  return {postFavourite, getFavouritesByFileId, deleteFavourite};
};

export {useMedia, useLogin, useUser, useTag, useFavourite};

