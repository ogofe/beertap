// import React from 'react';
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   useBreakpointValue,
// } from '@chakra-ui/react';

// export const ResponsiveTable = ({ data, columns }) => {
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   return (
//     <Table variant="simple" size={isMobile ? 'sm' : 'md'}>
//       <TableCaption placement="top">Your Table Caption</TableCaption>
//       <Thead>
//         <Tr>
//           {columns.map((column) => (
//             <Th key={column.id}>{column.Header}</Th>
//           ))}
//         </Tr>
//       </Thead>
//       <Tbody>
//         {data.map((row, rowIndex) => (
//           <Tr key={rowIndex}>
//             {columns.map((column) => (
//               <Td key={column.id}>{row[column.accessor]}</Td>
//             ))}
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   );
// };




export const Skeleton = ({ props }) => {

	return(
		<div class="container mt-4" {...props} >
		    <div class="row">
		      <div class="col-md-6 mx-auto loading-skeleton" style={{height: '20px'}}></div>
		    </div>
		    <div class="row mt-3">
		      <div class="col-md-8 mx-auto loading-skeleton" style={{height: '15px'}}></div>
		    </div>
		    <div class="row mt-3">
		      <div class="col-md-4 mx-auto loading-skeleton" style={{height: '10px'}}></div>
		    </div>
		</div>
	)
}