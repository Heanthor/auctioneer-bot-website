import featureFlags from '../../utils/feature-flags';

const Feature = props => {
    let {name, children} = props;
    return featureFlags[name] ? children : null;
}

export default Feature;