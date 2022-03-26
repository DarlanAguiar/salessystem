import { ServiceAccount } from "firebase-admin";

export const credentials: ServiceAccount = {
  projectId: "salessystem-659c6",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCEis2RxwT7FfCn\nkZkf6t2Eoi5Tymw8YuMoXCSXN1//7sdjwuUXfUe7n70XD2vjG1IIlK1Prmu9xjJI\naMYtLm6jX725wEe795uw72MRwC29+OmdhGZ/SP5FHZVHS+1SGguFVswp+/P+ldda\nrjHX0PZfaUy2aFfwRSxmehgopDFPw3o+bfibsA0ACjuacqPSCVgFqoMP1OYnuALI\nouOtgnxYOPnnckTR4nFOgI0oY/eQr2iw1NBrY9YI3YCWOdE+dLR0NxQWYcv1W3sG\nc5Anbq7RPrWGibaMZHvohRbB2wCIbSXJZJdwb95ik4Hf3WQ9z5IpKkON8/yO2+SK\n0VI3w8wtAgMBAAECggEADS2l4d7ewmj8jBS1xmQk+/6KH6pVQlh3YI3E1O+HETHj\nIQABpOkVHEp2KRhPRaieP/HUckM+kthlgH3rvRX29IcyRzP0jfPBHFcOS8yxX52j\nphXs1lliGr97FmMuE1yOlQaRIdgw0Dktd+aGWIB+Np9dfBd6LY7F1YyXNqyYpeb+\nRmbRLOWJQ3nDvWuGC1P2xji5zolxEXYVeptC4ddxGRXC/NmnS4NjQMQ8qL328rId\nkFuifWH/wn/Vb7DJOvcaK9rht8+2twExs/6bWyNGgjBd6NO1KuWj3a5G+1lGXzRT\n7BnPjWpyviQf8aNOnFZwsi+M43qHO/SeEEzl73wNiwKBgQC4cXIK2M16tokq5xWQ\n1Wg1L77kFOraxmIgiUCn7hjxS0vK1bEAgdJsQ4oOnOrdVAsnrI56Qk8DPdBd0JnA\nYBjUFPwy8d/WmxLTB+ee46pf0RbVtztyAEDD7GNsN9HyJrU6po9BKb2eNUIMOahq\nq7uwWGXywCaB3nf+q1hu5NDrzwKBgQC39qaZ43BkDx9qbLciXe+sUcQLfksAGiXv\nvDOtyXhX9p+kSl/68BqLb+/o/lYn5wUWAv14zeWZ+//GNgk2vpAOo/rg08hEkO3N\nvC3MGKNDN0e5u7C/RN/EqXWubiGv27Wih7aEWCBl/LZgsvIXnpGjXTAuc/NCItvC\n8zp9ueTbQwKBgFEjJsX6xbm73u+OpIAIQUVUcacoRIBlUPl7J4Q4S6SqOPdLtgfB\nFG4n7+2pvfALbrTPRgYmcVe9s5HxmBF2tLVnXeKTYKKpqUhIa+4LvQFVm7P8XRwz\nXEpUDRCoJaVevc7FQrOpxw5340w5eQsj7PcQjBiTytzKnwLbIZX29qklAoGAQ429\njBEq+nNbM/eMIICiPIMiHJ5Z6EWx3KEd0RmEqbiU0v3E1R9KgB2w2bxb4vdAtN6Q\nOcZSJAOX3y+EnqfHuriYrerXReZ6jOwnXSVG/q3UFu5Hb1VZXpxj7JPgpvVlc7Om\nYF8ENq9gQY40vFusW3Mi+Ev37jdiv+oVdonG8oUCgYBn0oECJrFUtBlyUKiA0vMq\npEn7CV3I809rOjNvyL7F6w1qwkpQtdsnZU2hRvrwyOpCovQG7nP7StEs10eMunlW\n//D62fvRgF5Q1wh+vyS32z5u/aWDMGnkuyUMksGLXWknIAtK6wE8BUs/xydIvq0l\njxxywEnZBm06za1vrjrv4A==\n-----END PRIVATE KEY-----\n",
  clientEmail:
    "firebase-adminsdk-g4x7x@salessystem-659c6.iam.gserviceaccount.com",
  
};

// export const credentials: ServiceAccount = {
//   type: "service_account",
//   project_id: "salessystem-659c6",
//   private_key_id: "cfb19e49e111c0f371a1b648488792329987982b",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCEis2RxwT7FfCn\nkZkf6t2Eoi5Tymw8YuMoXCSXN1//7sdjwuUXfUe7n70XD2vjG1IIlK1Prmu9xjJI\naMYtLm6jX725wEe795uw72MRwC29+OmdhGZ/SP5FHZVHS+1SGguFVswp+/P+ldda\nrjHX0PZfaUy2aFfwRSxmehgopDFPw3o+bfibsA0ACjuacqPSCVgFqoMP1OYnuALI\nouOtgnxYOPnnckTR4nFOgI0oY/eQr2iw1NBrY9YI3YCWOdE+dLR0NxQWYcv1W3sG\nc5Anbq7RPrWGibaMZHvohRbB2wCIbSXJZJdwb95ik4Hf3WQ9z5IpKkON8/yO2+SK\n0VI3w8wtAgMBAAECggEADS2l4d7ewmj8jBS1xmQk+/6KH6pVQlh3YI3E1O+HETHj\nIQABpOkVHEp2KRhPRaieP/HUckM+kthlgH3rvRX29IcyRzP0jfPBHFcOS8yxX52j\nphXs1lliGr97FmMuE1yOlQaRIdgw0Dktd+aGWIB+Np9dfBd6LY7F1YyXNqyYpeb+\nRmbRLOWJQ3nDvWuGC1P2xji5zolxEXYVeptC4ddxGRXC/NmnS4NjQMQ8qL328rId\nkFuifWH/wn/Vb7DJOvcaK9rht8+2twExs/6bWyNGgjBd6NO1KuWj3a5G+1lGXzRT\n7BnPjWpyviQf8aNOnFZwsi+M43qHO/SeEEzl73wNiwKBgQC4cXIK2M16tokq5xWQ\n1Wg1L77kFOraxmIgiUCn7hjxS0vK1bEAgdJsQ4oOnOrdVAsnrI56Qk8DPdBd0JnA\nYBjUFPwy8d/WmxLTB+ee46pf0RbVtztyAEDD7GNsN9HyJrU6po9BKb2eNUIMOahq\nq7uwWGXywCaB3nf+q1hu5NDrzwKBgQC39qaZ43BkDx9qbLciXe+sUcQLfksAGiXv\nvDOtyXhX9p+kSl/68BqLb+/o/lYn5wUWAv14zeWZ+//GNgk2vpAOo/rg08hEkO3N\nvC3MGKNDN0e5u7C/RN/EqXWubiGv27Wih7aEWCBl/LZgsvIXnpGjXTAuc/NCItvC\n8zp9ueTbQwKBgFEjJsX6xbm73u+OpIAIQUVUcacoRIBlUPl7J4Q4S6SqOPdLtgfB\nFG4n7+2pvfALbrTPRgYmcVe9s5HxmBF2tLVnXeKTYKKpqUhIa+4LvQFVm7P8XRwz\nXEpUDRCoJaVevc7FQrOpxw5340w5eQsj7PcQjBiTytzKnwLbIZX29qklAoGAQ429\njBEq+nNbM/eMIICiPIMiHJ5Z6EWx3KEd0RmEqbiU0v3E1R9KgB2w2bxb4vdAtN6Q\nOcZSJAOX3y+EnqfHuriYrerXReZ6jOwnXSVG/q3UFu5Hb1VZXpxj7JPgpvVlc7Om\nYF8ENq9gQY40vFusW3Mi+Ev37jdiv+oVdonG8oUCgYBn0oECJrFUtBlyUKiA0vMq\npEn7CV3I809rOjNvyL7F6w1qwkpQtdsnZU2hRvrwyOpCovQG7nP7StEs10eMunlW\n//D62fvRgF5Q1wh+vyS32z5u/aWDMGnkuyUMksGLXWknIAtK6wE8BUs/xydIvq0l\njxxywEnZBm06za1vrjrv4A==\n-----END PRIVATE KEY-----\n",
//   client_email:
//     "firebase-adminsdk-g4x7x@salessystem-659c6.iam.gserviceaccount.com",
//   client_id: "114888780334195479204",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g4x7x%40salessystem-659c6.iam.gserviceaccount.com",
// };
