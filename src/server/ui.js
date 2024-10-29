export const onOpen = () => {
  const ui = SlidesApp.getUi();
  ui.createAddonMenu()
    .addItem('Открыть панель дополнения', 'showSidebar')
    .addToUi();
}

export const showSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-upload')
    .setTitle('Моё дополнение');
  SlidesApp.getUi().showSidebar(html);
}