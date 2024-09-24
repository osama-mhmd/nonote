enum Result {
  Success = "success",
  InvalidCode = "invalid-code",
  ExpiredCode = "expired-code",
  UserNotFound = "user-not-found",
}

export enum NewPasswordResult {
  Success = "success",
  UserNotFound = "user-not-found",
  AlreadySent = "already-sent",
  SentAnotherOne = "sent-another-one",
}

export enum ChangePasswordResult {
  InvalidPassword = "invalid-password",
  InvalidTokenHash = "invalid-token-hash",
  NoUser = "no-user",
  Success = "success",
}

export default Result;
