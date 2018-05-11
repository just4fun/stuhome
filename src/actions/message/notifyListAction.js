import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const INVALIDATE = Symbol();
export const MARK_AT_ME_AS_READ = Symbol();
export const MARK_REPLY_AS_READ = Symbol();
export const MARK_SYSTEM_AS_READ = Symbol();
export const fetchNotifyList = createAction(REQUEST);
export const invalidateNotifyList = createAction(INVALIDATE);

const markAtMeAsRead = createAction(MARK_AT_ME_AS_READ);
const markReplyAsRead = createAction(MARK_REPLY_AS_READ);
const markSystemAsRead = createAction(MARK_SYSTEM_AS_READ);

// Update unread message count immediately instead of
// clearing them with next poll after 0 ~ 15s.
export const successfulCallback = (payload) => {
  switch (payload.notifyType) {
    case 'at':
      return markAtMeAsRead();
    case 'post':
      return markReplyAsRead();
    case 'system':
      return markSystemAsRead();
  }
}

export const REQUEST_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED, null, (...args) => args[1]);
