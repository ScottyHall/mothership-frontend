import React from 'react';
import Image from 'next/image';

function D20({ joinResponse }) {
  return (
    <div style={{ width: '100px', height: 'fit-content', textAlign: 'center', paddingTop: '20px'}}>
      <Image src="/d20.png" width={100} height={100} alt="D20"/>
      <div style={{ position: 'relative', top: '-74px', fontSize: '18px', fontWeight: 'bold' }}>{joinResponse}</div>
    </div>
  );
}

export default D20;
