import { v4 as uuid4 } from 'https://jspm.dev/uuid';

const uuid = () => {
  const x = uuid4();
  const short = x.split('-');
  const last = short.at(-1);
  return last;
};

export default uuid;