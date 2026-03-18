import { sendError } from "@/http/api";
import {
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { FireBaseErrors } from "../errors/firebase-errors";
import { auth } from "../lib/firebaseClient";
import { saveUser, saveUser2 } from "./firebase-db-service";

function notifyAuth(type, user, method) {
  fetch('/api/auth-notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, email: user.email, uid: user.uid, method }),
  }).catch(() => {})
}

const signinWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
    const user = result.user;
    const res = await saveUser(user);
    notifyAuth('login', user, 'google');
    const token = await user.getIdToken();
    const refreshToken = await user.refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    // Set refresh token as a cookie for backend access
    document.cookie = `refresh_token=${refreshToken}; path=/; secure; samesite=strict`;
    return res;
  } catch (error) {
    await sendError(error);
    if ((error).code === "auth/popup-closed-by-user") {
      throw new FireBaseErrors.POPUP_CLOSED_BY_USER("Popup closed by user");
    } else if ((error).code === "auth/popup-blocked") {
      throw new FireBaseErrors.POPUP_BLOCKED("Popup blocked by browser");
    } else if ((error).code === "auth/operation-not-supported-in-this-environment") {
      throw new FireBaseErrors.OPERATION_NOT_SUPPORTED("Operation not supported in this environment");
    } else if ((error).code === "auth/auth-event-not-found") {
      throw new FireBaseErrors.NO_AUTH_EVENT("Auth event not found");
    } else if((error).code === "auth/rejected-credential") {
      throw new FireBaseErrors.REJECTED_CREDENTIAL("Rejected credential");
    } else if((error).code === "auth/credential-already-in-use") {
      throw new FireBaseErrors.CREDENTIAL_ALREADY_IN_USE("Credential already in use");
    } else if((error).code === "auth/user-not-found") {
      throw new FireBaseErrors.USER_DELETED("User deleted");
    } else if((error).code === "auth/operation-not-allowed") {
      throw new FireBaseErrors.OPERATION_NOT_ALLOWED("Operation not allowed");
    } else if((error).code === "auth/email-already-in-use"){
      throw new FireBaseErrors.EMAIL_EXISTS("Email already in use");
    } else if((error).code === "auth/wrong-password"){
      throw new FireBaseErrors.INVALID_PASSWORD("Invalid password");
    } else if((error).code === "auth/cancelled-popup-request"){
      throw new FireBaseErrors.EXPIRED_POPUP_REQUEST("Expired popup request");
    } else if((error).code === "auth/invalid-credential"){
      throw new FireBaseErrors.INVALID_CRED("Invalid credentials");
    } else {
      throw new FireBaseErrors.INTERNAL_ERROR("Unknown error");
    }
  }
}

const signinWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const res = await saveUser2(user);
    notifyAuth('login', user, 'email');
    const token = await user.getIdToken();
    const refreshToken = await user.refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    // Set refresh token as a cookie for backend access
    document.cookie = `refresh_token=${refreshToken}; path=/; secure; samesite=strict`;
    return res;
  } catch (error) {
    await sendError(error);
    if ((error).code === "auth/popup-closed-by-user") {
      throw new FireBaseErrors.POPUP_CLOSED_BY_USER("Popup closed by user");
    } else if ((error).code === "auth/popup-blocked") {
      throw new FireBaseErrors.POPUP_BLOCKED("Popup blocked by browser");
    } else if ((error).code === "auth/operation-not-supported-in-this-environment") {
      throw new FireBaseErrors.OPERATION_NOT_SUPPORTED("Operation not supported in this environment");
    } else if ((error).code === "auth/auth-event-not-found") {
      throw new FireBaseErrors.NO_AUTH_EVENT("Auth event not found");
    } else if((error).code === "auth/rejected-credential") {
      throw new FireBaseErrors.REJECTED_CREDENTIAL("Rejected credential");
    } else if((error).code === "auth/credential-already-in-use") {
      throw new FireBaseErrors.CREDENTIAL_ALREADY_IN_USE("Credential already in use");
    } else if((error).code === "auth/user-not-found") {
      throw new FireBaseErrors.USER_DELETED("User deleted");
    } else if((error).code === "auth/operation-not-allowed") {
      throw new FireBaseErrors.OPERATION_NOT_ALLOWED("Operation not allowed");
    } else if((error).code === "auth/email-already-in-use"){
      throw new FireBaseErrors.EMAIL_EXISTS("Email already in use");
    } else if((error).code === "auth/wrong-password"){
      throw new FireBaseErrors.INVALID_PASSWORD("Invalid password");
    } else if((error).code === "auth/cancelled-popup-request"){
      throw new FireBaseErrors.EXPIRED_POPUP_REQUEST("Expired popup request");
    } else if((error).code === "auth/invalid-credential"){
      throw new FireBaseErrors.INVALID_CRED("Invalid credentials");
    } else {
      throw new FireBaseErrors.INTERNAL_ERROR("Unknown error");
    }
  }
}

const signUpWithEmail = async (email, password, firstName, lastName) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const res = await saveUser2(user, firstName, lastName);
    notifyAuth('signup', user, 'email');
    const token = await user.getIdToken();
    const refreshToken = await user.refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    // Set refresh token as a cookie for backend access
    document.cookie = `refresh_token=${refreshToken}; path=/; secure; samesite=strict`;
    return res;
  } catch (error) {
    await sendError(error);
    if ((error).code === "auth/popup-closed-by-user") {
      throw new FireBaseErrors.POPUP_CLOSED_BY_USER("Popup closed by user");
    } else if ((error).code === "auth/popup-blocked") {
      throw new FireBaseErrors.POPUP_BLOCKED("Popup blocked by browser");
    } else if ((error).code === "auth/operation-not-supported-in-this-environment") {
      throw new FireBaseErrors.OPERATION_NOT_SUPPORTED("Operation not supported in this environment");
    } else if ((error).code === "auth/auth-event-not-found") {
      throw new FireBaseErrors.NO_AUTH_EVENT("Auth event not found");
    } else if((error).code === "auth/rejected-credential") {
      throw new FireBaseErrors.REJECTED_CREDENTIAL("Rejected credential");
    } else if((error).code === "auth/credential-already-in-use") {
      throw new FireBaseErrors.CREDENTIAL_ALREADY_IN_USE("Credential already in use");
    } else if((error).code === "auth/user-not-found") {
      throw new FireBaseErrors.USER_DELETED("User deleted");
    } else if((error).code === "auth/operation-not-allowed") {
      throw new FireBaseErrors.OPERATION_NOT_ALLOWED("Operation not allowed");
    } else if((error).code === "auth/email-already-in-use"){
      throw new FireBaseErrors.EMAIL_EXISTS("Email already in use");
    } else if((error).code === "auth/wrong-password"){
      throw new FireBaseErrors.INVALID_PASSWORD("Invalid password");
    } else if((error).code === "auth/cancelled-popup-request"){
      throw new FireBaseErrors.EXPIRED_POPUP_REQUEST("Expired popup request");
    } else if((error).code === "auth/invalid-credential"){
      throw new FireBaseErrors.INVALID_CRED("Invalid credentials");
    } else {
      throw new FireBaseErrors.INTERNAL_ERROR("Unknown error");
    }
  }
}

export { signinWithEmail, signinWithGoogle, signUpWithEmail };
