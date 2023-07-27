import * as t from './types';
import request from './request';
import * as endpoints from './api-endpoints';

export function getConversations(pageNumber: string): Promise<t.TGetConversationsResponse> {
  return request.get(endpoints.conversations(pageNumber));
}

export function abortRequestWithMessage(
  endpoint: string,
  abortKey: string,
  message: string,
): Promise<void> {
  return request.post(endpoints.abortRequest(endpoint), { arg: { abortKey, message } });
}

export function deleteConversation(payload: t.TDeleteConversationRequest) {
  //todo: this should be a DELETE request
  return request.post(endpoints.deleteConversation(), { arg: payload });
}

export function clearAllConversations(): Promise<unknown> {
  return request.post(endpoints.deleteConversation(), { arg: {} });
}

export function getMessagesByConvoId(id: string): Promise<t.TMessage[]> {
  return request.get(endpoints.messages(id));
}

export function getConversationById(id: string): Promise<t.TConversation> {
  return request.get(endpoints.conversationById(id));
}

export function updateConversation(
  payload: t.TUpdateConversationRequest,
): Promise<t.TUpdateConversationResponse> {
  return request.post(endpoints.updateConversation(), { arg: payload });
}

export function getPresets(): Promise<t.TPreset[]> {
  return request.get(endpoints.presets());
}

export function createPreset(payload: t.TPreset): Promise<t.TPreset[]> {
  return request.post(endpoints.presets(), payload);
}

export function updatePreset(payload: t.TPreset): Promise<t.TPreset[]> {
  return request.post(endpoints.presets(), payload);
}

export function deletePreset(arg: t.TPreset | object): Promise<t.TPreset[]> {
  return request.post(endpoints.deletePreset(), arg);
}

export function getSearchEnabled(): Promise<boolean> {
  return request.get(endpoints.searchEnabled());
}

export function getUser(): Promise<t.TUser> {
  return request.get(endpoints.user());
}

export const searchConversations = async (
  q: string,
  pageNumber: string,
): Promise<t.TSearchResults> => {
  return request.get(endpoints.search(q, pageNumber));
};

export const getAIEndpoints = () => {
  return request.get(endpoints.aiEndpoints());
};

export const updateTokenCount = (text: string) => {
  return request.post(endpoints.tokenizer(), { arg: text });
};

export const login = (payload: t.TLoginUser) => {
  return request.post(endpoints.login(), payload);
};

export const logout = () => {
  return request.post(endpoints.logout());
};

export const register = (payload: t.TRegisterUser) => {
  return request.post(endpoints.register(), payload);
};

export const refreshToken = () => {
  return request.post(endpoints.refreshToken());
};

export const getLoginGoogle = () => {
  return request.get(endpoints.loginGoogle());
};

export const requestPasswordReset = (
  payload: t.TRequestPasswordReset,
): Promise<t.TRequestPasswordResetResponse> => {
  return request.post(endpoints.requestPasswordReset(), payload);
};

export const resetPassword = (payload: t.TResetPassword) => {
  return request.post(endpoints.resetPassword(), payload);
};

export const getAvailablePlugins = (): Promise<t.TPlugin[]> => {
  return request.get(endpoints.plugins());
};

export const updateUserPlugins = (payload: t.TUpdateUserPlugins) => {
  return request.post(endpoints.userPlugins(), payload);
};

export const getStartupConfig = (): Promise<t.TStartupConfig> => {
  return request.get(endpoints.config());
};

// Helpers of ResearchAssistant

export const userInfo = (userId: string): Promise<t.TUserInfo> =>
  request.get(endpoints.userInfo(userId));

export const pdfList = (userId: string): Promise<t.TPdf[]> =>
  request.get(endpoints.pdfList(userId));

export const uploadPdfs = (userId: string, files: File[]): Promise<t.TPdf[]> => {
  const formData = new FormData();
  formData.append('userId', userId);
  files.forEach((it) => formData.append('files', it));

  return request.postMultiPart(endpoints.uploadPdfs(), formData);
};

export const deletePdfs = (payload: t.TPdfListPayload): Promise<t.TPdf[]> =>
  request.post(endpoints.deletePdfs(), payload);

export const updatePdf = (payload: t.TPdf): Promise<t.TPdf> =>
  request.post(endpoints.updatePdf(payload.id), payload);
