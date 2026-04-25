// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/common/database/prisma.service';

// @Injectable()
// export class BaseRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async getCompanyId(userId: string): Promise<string | null | undefined> {
//     return await this.prisma.companyAdminProfile
//       .findUnique({
//         where: { userId },
//         select: {
//           companyId: true,
//         },
//       })
//       .then((data) => {
//         return data?.companyId;
//       });
//   }
// }
