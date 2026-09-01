---
date: "Tháng 2 2024 - Hiện tại"
title: "Lumin Web PDF"
slug: "lumin-web-pdf"
description: "Lumin Web PDF là trình chỉnh sửa in-app, trái tim của Lumin — nền tảng SaaS về PDF phục vụ hơn 100 triệu người dùng trên toàn thế giới. Là developer trong squad In-App PDF Editor, mình xây dựng và duy trì các tính năng cốt lõi người dùng dùng mỗi ngày: chú thích, ký điện tử, chỉnh sửa văn bản, OCR, sắp xếp tài liệu và các công cụ AI, với Next.js trên nền các service NestJS giao tiếp qua gRPC."
type: "company"
previewLink: "https://www.luminpdf.com/app/pdf"
imageSrc: "/images/projects/lumin-web-pdf.png"
ranking: 10
tech:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "NestJS"
  - "gRPC"
  - "MongoDB"
  - "RabbitMQ"
  - "AWS Lambda"
  - "AWS S3"
  - "AWS SQS"
  - "PDF SDK"
  - "Micro-frontend"
tools:
  - "GitHub"
  - "Linear"
  - "Notion"
  - "Figma"
  - "Datadog"
  - "Jira"
  - "AI Coding Agents"
---

## TÍNH NĂNG CHÍNH & CÔNG NGHỆ

- **Bộ công cụ chỉnh sửa cốt lõi**: Xây dựng và duy trì những tính năng người dùng tương tác hằng ngày — **chú thích**, **ký điện tử**, **chỉnh sửa văn bản**, **OCR**, **gộp/xoay trang** và các **công cụ tài liệu ứng dụng AI**.

- **Kiến trúc**: Front end **Next.js** trên nền các service **NestJS** giao tiếp qua **gRPC**, cùng **MongoDB**, **RabbitMQ** cho xử lý hướng sự kiện và **AWS** (Lambda, S3, SQS).

- **Công cụ tài liệu AI**: Đưa các khả năng AI vào thẳng trình chỉnh sửa, mang luồng làm việc tự động và hội thoại đến ngay trên tài liệu người dùng đang xử lý.

  ![Công cụ tài liệu ứng dụng AI trong trình chỉnh sửa Lumin](/images/projects/lumin-web-pdf-ai-agent.png)

- **Quy mô**: Mọi tính năng đều phát hành cho nền tảng hơn **100 triệu người dùng**, nên hiệu năng, độ ổn định và khả năng tương thích ngược là ràng buộc bắt buộc chứ không phải chuyện tính sau.

## THÀNH TỰU & CỘT MỐC

### ✍️ Tích hợp Lumin Sign — ~$29,500 giá trị hợp đồng

- **Developer phụ trách chính** phần tích hợp **PDF × Lumin Sign**: tạo các trường chữ ký trên PDF và chuyển tiếp mượt mà sang Lumin Sign để ký.
- Định vị Lumin như một lựa chọn thay thế trực tiếp cho **DocuSign**, và tính năng này đã góp phần **chốt nhiều hợp đồng với giá trị ước tính $29,500**.

  ![Tích hợp PDF và Lumin Sign](/images/projects/lumin-web-pdf-x-sign.png)

- Phần khó nằm ở việc đồng bộ giữa mô hình tài liệu của editor và service ký, để các trường tạo trên PDF được giữ nguyên vẹn sau khi bàn giao.

### 🗂️ Tái cấu trúc PDF Actions — hợp đồng ~$16,000

- **Xây dựng lại bố cục và luồng của các thao tác PDF** (gộp, xoay, sắp xếp trang...), biến một tập thao tác rời rạc thành một luồng mạch lạc và dễ đoán.
- **Tùy chỉnh riêng cho một khách hàng trong lĩnh vực tài chính**, trực tiếp hỗ trợ hợp đồng trị giá **~$16,000**.

  ![Luồng sắp xếp và thao tác PDF sau khi tái cấu trúc](/images/projects/lumin-web-pdf-organize.png)

### 💰 Chuyển sang PDF SDK nội bộ — tiết kiệm ước tính ~$5 triệu

- Đóng góp phần **feature mapping và hỗ trợ migration** khi chuyển từ **PDF engine của bên thứ ba** sang **PDF SDK do Lumin tự phát triển**.
- Sáng kiến này giúp khách hàng tiết kiệm ước tính **~5 triệu đô la**.
- Thử thách lớn nhất là sự tương đương: rà soát mọi hành vi của editor phụ thuộc vào engine cũ và đảm bảo bản thay thế khớp hoàn toàn trước khi chuyển người dùng sang.

### 🤖 "AI Migration" — chiến dịch lớn nhất lịch sử công ty

- **Thành viên nòng cốt** của **"AI Migration"** — chiến dịch lớn nhất trong lịch sử **Designveloper**, hoàn thành chỉ trong **2 tuần**:
  - Hợp nhất **các repository của từng team vào một codebase duy nhất**
  - Chuyển **Bitbucket → GitHub** và **Jira/Confluence → Linear/Notion**
  - **Đưa công cụ AI** vào thẳng quy trình phát triển hằng ngày
- Kết quả đo được ngay lập tức: một tính năng **trước đó ước tính mất ~1 năm đã được hoàn thành trong 2 tuần** sau đó.

### 🎉 Một phần của nền tảng 100 triệu người dùng

- Những tính năng editor mình phụ trách được sử dụng mỗi ngày trên nền tảng đã vượt mốc **100 triệu người dùng** toàn cầu.

## THÁCH THỨC KỸ THUẬT

- **Giao tiếp giữa các service**: Giữ cho front end Next.js luôn phản hồi nhanh trong khi điều phối các lời gọi **gRPC** qua nhiều service NestJS, với **RabbitMQ** đảm nhận các tác vụ xử lý tài liệu kéo dài.
- **Hiệu năng PDF ở quy mô lớn**: Render, OCR và xử lý tài liệu lớn phải giữ được tốc độ ngay trên trình duyệt với những file rất khác nhau về kích thước và chất lượng.
- **Migration không gây lỗi hồi quy**: Thay engine PDF nằm dưới các tính năng hàng triệu người dùng mỗi ngày đồng nghĩa sự tương đương về hành vi quan trọng hơn nhiều so với tương đương về code.

## TÓM TẮT

Lumin Web PDF là nơi công việc của mình thể hiện rõ nhất: **trình chỉnh sửa hằng ngày** của một nền tảng **hơn 100 triệu người dùng**. Ngoài việc phát triển các tính năng cốt lõi, công việc luôn gắn với **kết quả kinh doanh cụ thể** — **~$29,500** từ tích hợp Lumin Sign, hợp đồng **~$16,000** nhờ luồng PDF actions mới, và khoản tiết kiệm ước tính **~$5 triệu** từ việc chuyển sang SDK nội bộ — trong khi **AI Migration** đã thay đổi cách cả team phát triển phần mềm.
