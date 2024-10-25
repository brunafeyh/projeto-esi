import { FC } from 'react';
import { Typography, Box } from '@mui/material';

const decodeUnicode = (str: string) => {
  return str.replace(/\\u([a-fA-F0-9]{4})/g, (_, group) => {
    return String.fromCharCode(parseInt(group, 16));
  });
};


const parseMarkdownString = (text: string) => {
  let parsedText = decodeUnicode(text);
  const paragraphs = parsedText.split('\n\n');

  return paragraphs.map((paragraph, index) => {
    const parts = paragraph.split(/(\*\*.+?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Typography
            component="span"
            key={i}
            sx={{ fontWeight: 'bold' }}
          >
            {part.slice(2, -2)} 
          </Typography>
        );
      }
      return <Typography component="span" key={i}>{part}</Typography>;
    });

    return (
      <Typography
        key={index}
        variant="body1"
        sx={{ marginBottom: 2 }} 
      >
        {parts}
      </Typography>
    );
  });
};

export const RenderMarkdownText: FC<{ text: string }> = ({ text }) => {
  return <Box>{parseMarkdownString(text)}</Box>;
};

