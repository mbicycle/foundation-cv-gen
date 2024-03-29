export type ExtendedFileType = File & { preview: string; };

export enum Text {
  FileUpload = 'Drag and Drop a photo file or',
  UpdatePhoto = 'Drag and Drop to update a photo file or',
  UploadOne = 'Upload one',
  AddPhoto = 'Add photo',
  Change = 'Change image',
  Success = 'Success!',
  GuestAccess = 'Guest access link has been generated.',
  LinkValid = 'The link is valid within 1 hour!',
  Copy = 'Copy',
  NoResults = 'No results found',
}
