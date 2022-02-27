import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

interface propsParams {
  name: never;
  params: never;
}
export const navigateFromRoot = ({name, params}: propsParams) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
