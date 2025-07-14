import { ApiProperty } from '@nestjs/swagger';

export class Commodities {
  @ApiProperty({
    type: String,
    example: 'b6a8e153-2d3d-4e7a-9c5e-39557d78fc9a',
    description: 'Unique identifier of the commodity',
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({
    type: String,
    example: 'Palm Oil',
    description: 'Name of the commodity',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Type of the commodity',
  })
  type: string;
  //
  // @ApiProperty({
  //   type: () => [Orders],
  //   description: 'List of related orders',
  //   required: false,
  // })
  // orders: Orders[];
}
