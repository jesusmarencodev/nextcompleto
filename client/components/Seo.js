import React from 'react';
import Head  from 'next/head';


export default function Seo({title, description}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description}/>
    </Head>
  )
}


Seo.defaultProps = {
  title : "Gaming - tus juegos favoritos",
  description : "Tus jeugos favoritos, ps4, xbox, switch al mejor precio"
}