export const validateTitle = (title: string) => {
  if (title && title.length <= 255) {
    title = title.trim();
    return title;
  }
};

export const validateImageLink = (imageLink: string) => {
  if (imageLink && imageLink.length <= 1000) {
    imageLink = imageLink.trim();
    return imageLink;
  }
};

export const validatePostContent = (content: string) => {
  if (content && content.length <= 65535) {
    content = content.trim();
    return content;
  }
};

export const validateDate = (date: string) => {
  if (date && date.length <= 20) {
    return date;
  }
};

export const validateAuthor = (author: string) => {
  if (author && author.length <= 50) {
    return author;
  }
};

export const validateCommentContent = (content: string) => {
  if (content && content.length <= 65535) {
    content = content.trim();
    return content;
  }
};
