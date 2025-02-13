import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export async function navigate(routeName: string, params?: Object) {
    navigationRef.isReady()
    if (navigationRef.isReady()) {
        
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    } else {
        console.warn('Navigation container is not ready.');
    }
}

export async function replace(routeName: string, params?: Object) {
    navigationRef.isReady()
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params));
    } else {
        console.warn('Navigation container is not ready.');
    }
}

export async function resetAndNavigate(routeName: string) {
    navigationRef.isReady()
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: routeName}],
        }));
    } else {
        console.warn('Navigation container is not ready.');
    }
}

export async function goBack() {
    navigationRef.isReady()
    if (navigationRef.isReady() ) {
        navigationRef.dispatch(CommonActions.goBack());
    } else {
        console.warn('Cannot go back - no previous screen in the stack or navigation container is not ready.');
    }
}

export async function push(routeName: string, params?: Object) {
    navigationRef.isReady()
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params));
    } else {
        console.warn('Navigation container is not ready.');
    }
}


export function printNavigationStack() {
    
}

