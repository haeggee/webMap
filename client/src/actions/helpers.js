import { getState, setState } from "statezero";

// Initialize all state paths used by the app as empty.
// Could easily be extended to more attributes

// - auth state path is used by the root App component to check if user is logged in
// - message is used by Login component to give error message if wrong credentials used
// - allPolygons is used by Mainview component
// - selectedPolygons state path is used by the Mainview component

export const setEmptyState = () => {
    setState("auth", "noAuth");
    setState("message", "");
    setState("allPolygons", []);
    setState("selectedPolygons", []);
};


export const updateLoginForm = field => {
    const { name, value } = field;
    setState(`loginForm.${name}`, value);
};