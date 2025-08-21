
export function Loader() {
  return (
    <div className='flex flex-col space-y-3'>
      <div className='h-6 animate-pulse w-32 bg-gray-100 rounded-md mb-1' />
      <div className='h-6 animate-pulse  w-36 bg-gray-100 rounded-md mb-3' />
      <div className='animate-pulse mt-4 bg-gray-100 px-4 py-6 rounded-4xl mb-3'>
        <div className='h-6 w-32 bg-gray-50 rounded mb-3' />
        <div className='h-28 w-full bg-gray-50 rounded' />
      </div>{' '}
      <div className='h-6 animate-pulse w-36 bg-gray-100 rounded-md my-3' />
      <div className='flex  items-center gap-4 w-full overflow-x-auto scrollbar-hide'>
        {([1, 2, 3, 4, 5, 6, 7, 8] as const).map(item => (
          <div key={item} className='h-[200px] animate-pulse w-[250px] bg-gray-100 shrink-0 rounded-4xl' />
        ))}
      </div>
    </div>
  );
}
