import Card from '@mui/material/Card';

export const NormalCard = (props) => {
  const { variant = 'outlined', children = '', className = '' } = props;

  return (
    <Card {...props} className={className} variant={variant}>
      {children}
    </Card>
  );
};
