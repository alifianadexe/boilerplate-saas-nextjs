import { useEffect } from 'react';
import NextLink from 'next/link';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import LoadingDots from '@/components/Loading/loading-dots';

interface IndexProps {
  project: {
    data: string;
  };
}

export async function getStaticPaths() {
  const paths = [{ params: { site: 'test' } }, { params: { site: 'test2' } }];

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export const getStaticProps = async (context: { params: { site: string } }) => {
  const data = [
    { domain: 'test', data: 'My first test project' },
    { domain: 'test2', data: 'My second test project' }
  ];

  const project = data.find((p) => p.domain === context.params.site);
  if (!project) {
    return {
      notFound: true
    };
  }

  return {
    props: { project }
  };
};

export default function Index({ project }: IndexProps) {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/login');
  }, [status]);

  if (status === 'authenticated') {
    return (
      <>
        <h1>{project.data}</h1>
        <NextLink href="/dashboard" passHref>
          <Button className="active" disableRipple component="a">
            Dashboard
          </Button>
        </NextLink>
      </>
    );
  } else {
    return <LoadingDots></LoadingDots>;
  }
}
