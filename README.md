# Print Core Web Vitals
A small javascript program that prints out the Google Core Web Vitals results in a PDF file. 

I made this program as a way to start learning JavaScript so there are still things that may need some fixes; if you run into any issues then do please let me know.

## How does it work?

The application uses puppeteer and Javascript to navigate to the <a href=https://pagespeed.web.dev/>Google Pagespeed Insights</a> page, enter the URL that is given and then wait for the results before printing it out as a PDF.

## Usage

1. Download and Run the .exe file from the release or compile the code with the required dependencies.
2. Enter the URL of the website. 
3. Wait for the results
4. Find the Core Web Vitals results in the PDF file that is generated.

## Known Issues

### White-space at the end
The PDF has the footer printed in the second page which leads to a large amount of white space at the end, the results should be in the first page of the document.

