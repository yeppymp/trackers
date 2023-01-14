import React from 'react';
import Card from '../utilities/Card';
import Skeleton from '../utilities/Skeleton';

const SkeletonSummary = (props: { count: number }) => (
  <Card withShadow={true}>
    <div className="py-5 px-4">
      {[...Array(props.count)].map((x, i) => (
        <div key={`summary-list-${i}`}>
          <Skeleton className="rounded-md mt-2" height="24px" />
        </div>
      ))}
    </div>
  </Card>
);

export default SkeletonSummary;
