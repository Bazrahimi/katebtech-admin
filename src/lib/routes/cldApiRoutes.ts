// app/lib/routes/apiRoutes.ts
export const cldApiRoutes = {
  cloudinary: {
    upload: () => "/api/cloudinary",
    destroy: () => "/api/cloudinary/destroy",
  },
} as const;
