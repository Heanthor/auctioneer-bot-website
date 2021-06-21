
import {mockBountiful} from '../mockData'

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
    setTimeout(() => {
        setLoading(false);
        setResponse(mockBountiful);
    }, 2500);
}