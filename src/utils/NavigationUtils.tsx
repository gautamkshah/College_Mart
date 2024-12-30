import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(routeName: string, params?: Object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    } else {
        console.warn('Navigation container is not ready.');
    }
}

export function replace(routeName: string, params?: Object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params));
    } else {
        console.warn('Navigation container is not ready.');
    }
}

export function resetAndNavigate(routeName: string, params?: Object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params }],
        }));
    } else {
        console.warn('Navigation container is not ready.');
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.dispatch(CommonActions.goBack());
    } else {
        console.warn('Cannot go back - no previous screen in the stack or navigation container is not ready.');
    }
}

export function push(routeName: string, params?: Object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params));
    } else {
        console.warn('Navigation container is not ready.');
    }
}
