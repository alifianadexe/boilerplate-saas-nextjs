import NextLink from 'next/link';
import { Button } from '@mui/material';

export default function Admin() {
  return (
    <>
      <h1>Testing Ganti Ke Admin</h1>
      <NextLink href="/dashboard" passHref>
        <Button className="active" disableRipple component="a">
          Dashboard
        </Button>
      </NextLink>
    </>
  );
}
