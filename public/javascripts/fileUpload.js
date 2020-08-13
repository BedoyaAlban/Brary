const rooStyles = window.getComputedStyle(document.documentElement);

if (
  rooStyles.getPropertyValue("--book-cover-width-large") != null &&
  rooStyles.getPropertyValue("--book-cover-width-large") !== ""
) {
  ready();
} else {
  document.getElementById("main-css").addEventListener("load", ready);
}

function ready() {
  const coverWidth = parseFloat(
    rooStyles.getPropertyValue("--book-cover-width-large")
  );
  const coverAspectRatio = parseFloat(
    rooStyles.getPropertyValue("--book-cover-apect-ratio")
  );
  const coverHeight = coverWidth / coverAspectRatio;

  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight
  });

  FilePond.parse(document.body);
}
