import NextLink from 'next/link';
import { Button } from '@mui/material';

export default function Dashboard() {
  return (
    <>
      <h1>Testing Ganti Dashboard</h1>
      <NextLink href="/admin" passHref>
        <Button className="active" disableRipple component="a">
          Admin
        </Button>
      </NextLink>
      <NextLink href="/" passHref>
        <Button className="active" disableRipple component="a">
          Login
        </Button>
      </NextLink>
    </>
  );
}
