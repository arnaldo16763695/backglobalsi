// work-report.types.ts
import { Prisma } from "@prisma/client";

export type WorkWithRelations = Prisma.WorksGetPayload<{
  include: {
    company: true;
    stepsToWork: true;
    technicians: {
      include: {
        technician: true, 
      },
    },
  };
}>;
