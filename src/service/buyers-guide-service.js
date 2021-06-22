
import {mockBountifulResponse, mockTruncatedResponse} from '../mockData'

const mockApiCall = (t, v) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

export const getBuyersGuidePlus = (formValues, serviceMeta) => {
    /* eslint-disable no-unused-vars */
    const {
        regionSelection,
        serverSelection,
        modeSelection,
        searchQuery
    } = formValues;

    const {
        setLoading,
        setResponse,
        setErrored
    } = serviceMeta;
    /* eslint-enable no-unused-vars */

    setLoading(true);
    
    /* TODO: call the API */

    mockApiCall(2500, mockTruncatedResponse)
        .then(response => {
            setResponse(response);
        }).catch(error => {
            setErrored(error);
        }).finally(() => {
            setLoading(false);
        })
}