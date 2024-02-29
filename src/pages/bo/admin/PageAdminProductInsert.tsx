// import React, { useRef } from "react";
// import BoLayout from "components/bo/commons/BoLayout";
// import { Box, Button } from "@mui/material";
// import "@toast-ui/editor/dist/toastui-editor.css";
// import { Editor } from "@toast-ui/react-editor";

// const PageAdminProductInsert: React.FC = () => {
//   const editorRef = useRef<Editor>(null);

//   const handleSave = () => {
//     if (editorRef.current === null) return;
//     const markDownContent = editorRef.current.getInstance().getMarkdown();
//     const htmlContent = editorRef.current.getInstance().getHTML();

//     console.log(markDownContent);
//     console.log("================================================");
//     console.log(htmlContent);
//   };
//   return (
//     <BoLayout>
//       <Box height="100%" width="100%" bgcolor="white" p={2}>
//         <Box fontSize={20} m={1}>
//           상품 등록
//         </Box>
//         <Editor
//           ref={editorRef}
//           height="400px"
//           initialValue="상품 설명을 입력하세요."
//           previewStyle="vertical"
//           toolbarItems={[
//             ["heading", "bold", "italic", "strike"],
//             ["hr", "quote"],
//             ["ul", "ol", "indent", "outdent"],
//             ["image", "link"],
//           ]}
//         />
//         <Button variant="outlined" color="primary" sx={{ m: 1 }} onClick={handleSave}>
//           저장하기
//         </Button>
//       </Box>
//     </BoLayout>
//   );
// };
