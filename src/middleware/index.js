import {
  handleCompression,
  handleCors,
  handleMorgan,
  handleHelmet,
  handleBodyParsing,
} from './common';

export default [
  handleHelmet,
  handleBodyParsing,
  handleCors,
  handleMorgan,
  handleCompression,
];
