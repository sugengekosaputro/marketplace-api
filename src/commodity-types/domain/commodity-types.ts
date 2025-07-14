import { ApiProperty } from '@nestjs/swagger';

export class CommodityTypes {
  @ApiProperty({
    type: String,
    example: 'd3a7f9c2-b74e-4f8c-8f4f-17df232c00a9',
    description: 'Unique identifier of the commodity type',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Grains',
    description: 'Name of the commodity type',
  })
  name: string;

  // @ApiProperty({
  //   type: () => [Commodities],
  //   description: 'List of commodities belonging to this type',
  //   required: false,
  // })
  // commodities: Commodities[];

  @ApiProperty({
    type: Date,
    example: '2025-07-14T10:00:00Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: '2025-07-14T11:00:00Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    example: '2025-07-15T00:00:00Z',
    description: 'Soft delete timestamp (nullable)',
    required: false,
  })
  deletedAt: Date;
}
