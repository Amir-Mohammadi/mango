export class UserProfileResult {
  id = '';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  profileImageId? = '';
  mainGalleryImageUrl? = '';
  isLinkedGoogleAccount = false;
}

export class UserProfileEdit {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImageId?: string;
  mainGalleryImageUrl?: string;
  isLinkedGoogleAccount?: boolean;
}

export class MembersInputs {
  page = '';
  pageSize = '';
  sortOrder? = '';
  sortProperty? = '';
  textSearch? = '';
}

export class MembersResult {}

export class DeleteResult {}
