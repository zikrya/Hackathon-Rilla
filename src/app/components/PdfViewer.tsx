"use client";

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

const PdfViewerComponent = ({ fileUrl }: { fileUrl: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer">
      <Document
        file={fileUrl}
        onLoadSuccess={onLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages && (
        <div className="pdf-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <span>Page {pageNumber} of {numPages}</span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewerComponent;
