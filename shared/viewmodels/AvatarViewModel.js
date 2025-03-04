'use strict';

const { ViewModel, avatarInitials, getIdentifierColorNumber } = require('hydrogen-view-sdk');

const assert = require('matrix-public-archive-shared/lib/assert');
const { mxcUrlToHttpThumbnail } = require('matrix-public-archive-shared/lib/mxc-url-to-http');

class AvatarViewModel extends ViewModel {
  constructor(options) {
    super(options);

    const { homeserverUrlToPullMediaFrom, avatarUrl, avatarTitle, avatarLetterString, entityId } =
      options;
    assert(!avatarUrl || homeserverUrlToPullMediaFrom);
    assert(avatarTitle);
    assert(avatarLetterString);
    assert(entityId);

    this._homeserverUrlToPullMediaFrom = homeserverUrlToPullMediaFrom;
    this._avatarUrl = avatarUrl;
    this._avatarTitle = avatarTitle;
    this._avatarLetterString = avatarLetterString;
    this._entityId = entityId;
  }

  avatarUrl(size) {
    if (this._avatarUrl) {
      return mxcUrlToHttpThumbnail({
        mxcUrl: this._avatarUrl,
        homeserverUrl: this._homeserverUrlToPullMediaFrom,
        size,
      });
    }
    return null;
  }

  get avatarTitle() {
    return this._avatarTitle;
  }

  get avatarLetter() {
    return avatarInitials(this._avatarLetterString);
  }

  get avatarColorNumber() {
    return getIdentifierColorNumber(this._entityId);
  }
}

module.exports = AvatarViewModel;
