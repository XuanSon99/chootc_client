import axios from 'axios';
export default (context, inject) => {
    const callAPI = (method, url, data, callResponse, callError) => {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        };
        const baseurl = `https://hi.muabanusdt.xyz`
        const requestUrl = `${baseurl}/api/${url}`;
        switch (method) {
            case "post":
                axios.post(requestUrl, data, config).then((response) => {
                    callResponse(response)
                })
                    .catch((error) => {
                        // console.clear();
                        try {
                            callError(error)
                        } catch (error) {
                        }
                    })
                break;
            case "get":
                axios.get(requestUrl, config)
                    .then((response) => {
                        callResponse(response)
                    })
                    .catch((error) => {
                        // console.clear();
                        try {
                            callError(error)
                        } catch (error) {
                        }
                    })
                break;
            case "put":
                axios.put(requestUrl, data, config)
                    .then((response) => {
                        callResponse(response)
                    })
                    .catch((error) => {
                        // console.clear();
                        try {
                            callError(error)
                        } catch (error) {
                        }
                    })
                break;
            case "delete":
                axios.delete(requestUrl, config)
                    .then((response) => {
                        callResponse(response)
                    })
                    .catch((error) => {
                        // console.clear();
                        try {
                            callError(error)
                        } catch (error) {
                        }
                    })
                break;
        }
    }
    inject('callAPI', callAPI)
}