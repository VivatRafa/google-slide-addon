import { Slide } from '../client/sidebar-upload/components/UploadSidebar';

export const createSlidesFromData = (slideData: Slide[]) => {
  // Получаем активную презентацию
  const presentation = SlidesApp.getActivePresentation();

  slideData.forEach((slide) => {
    // Создаем новый слайд с макетом TITLE_AND_BODY
    const slidePage = presentation.appendSlide(
      SlidesApp.PredefinedLayout.TITLE_AND_BODY
    );

    // Устанавливаем заголовок слайда
    slidePage
      .getPlaceholder(SlidesApp.PlaceholderType.TITLE)
      .asShape()
      .getText()
      .setText(slide.title);

    // Устанавливаем содержание слайда
    const contentPlaceholder = slidePage
      .getPlaceholder(SlidesApp.PlaceholderType.BODY)
      .asShape();
    contentPlaceholder.getText().setText(slide.content.join('\n'));
  });
};
