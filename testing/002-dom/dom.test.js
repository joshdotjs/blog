import fs from 'fs';
import path from 'path';

import { beforeEach, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

import { displayMessage } from './dom';

const html_doc_path = path.join(process.cwd(), 'index.html');
const html_document_content = fs.readFileSync(html_doc_path).toString();

const window = new Window(); // create emulated browser
const document = window.document;
document.write(html_document_content);
vi.stubGlobal('document', document);

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(html_document_content);
});

// ==============================================

it ('should display message', () => {

  // create message <p> element in the DOM
  displayMessage('hello');

  const container = document.querySelector('#container');
  if (!container) throw new Error('container not found');

  const message = container.querySelector('.message');
  expect(message).not.toBeNull();

  const message_text = message.textContent;
  expect(message_text).toBe('hello');
});

// ==============================================

it ('should not display a message if displayMessage() is not called', () => {

  // create message <p> element in the DOM
  // displayMessage('another message');

  const container = document.querySelector('#container');
  if (!container) throw new Error('container not found');

  const message = container.querySelector('.message');
  expect(message).toBeNull();
});

// ==============================================

it ('should display another message', () => {

  // create message <p> element in the DOM
  displayMessage('another message');

  const container = document.querySelector('#container');
  if (!container) throw new Error('container not found');

  const message = container.querySelector('.message');
  expect(message).not.toBeNull();

  const message_text = message.textContent;
  expect(message_text).toBe('another message');
});