import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { WhatsappRepository } from './infrastructure/persistence/whatsapp.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Whatsapp } from './domain/whatsapp';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappsService {
  private readonly accessToken: string;
  private readonly fromPhoneNumberId: string;
  private readonly templateName: string;
  private readonly apiUrl: string;

  constructor(
    // Dependencies here
    private readonly whatsappRepository: WhatsappRepository,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    // @ts-expect-error - ConfigService.get() with infer option has incomplete type definitions
    this.accessToken = this.configService.get<string>('WHATSAPP_API_TOKEN', {
      infer: true,
    });
    // @ts-expect-error - ConfigService.get() with infer option has incomplete type definitions
    this.fromPhoneNumberId = this.configService.get<string>(
      'WHATSAPP_PHONE_NUMBER_ID',
      {
        infer: true,
      },
    );
    // @ts-expect-error - ConfigService.get() with infer option has incomplete type definitions
    this.templateName = this.configService.get<string>(
      'WHATSAPP_TEMPLATE_NAME',
      {
        infer: true,
      },
    );
    this.apiUrl = `https://graph.facebook.com/v23.0/${this.fromPhoneNumberId}/messages`;
  }

  async sendOrderStatusUpdate(
    customerPhone: string,
    customerName: string,
    commodityName: string,
    status: string,
    orderId: string,
  ): Promise<void> {
    // Pastikan nomor telepon dalam format internasional tanpa '+' atau '0' di depan
    const formattedPhone = customerPhone.startsWith('0')
      ? `62${customerPhone.substring(1)}`
      : customerPhone;

    const payload = {
      messaging_product: 'whatsapp',
      to: formattedPhone,
      type: 'template',
      template: {
        name: this.templateName,
        language: {
          code: 'id', // Bahasa Indonesia
        },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: customerName.toUpperCase() }, // Variabel {{1}}
              { type: 'text', text: commodityName.toUpperCase() }, // Variabel {{2}}
              { type: 'text', text: status.toUpperCase() }, // Variabel {{3}}
              { type: 'text', text: orderId },
            ],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: '0', // Index untuk tombol pertama
            parameters: [
              { type: 'text', text: orderId }, // Variabel {{4}}
            ],
          },
        ],
      },
    };

    try {
      console.log(
        `Mengirim notifikasi status untuk pesanan ${orderId} ke ${formattedPhone}`,
      );
      await firstValueFrom(
        this.httpService.post(this.apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      console.log(`Notifikasi untuk pesanan ${orderId} berhasil dikirim.`);
    } catch (error) {
      console.log(
        `Gagal mengirim notifikasi untuk pesanan ${orderId}`,
        error.response?.data || error.message,
      );
      // Penting: Jangan throw error di sini agar proses utama tidak gagal
      // hanya karena notifikasi gagal terkirim.
    }
  }

  async create(createWhatsappDto: CreateWhatsappDto) {
    // Do not remove comment below.
    // <creating-property />

    console.log(createWhatsappDto);
    return this.whatsappRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.whatsappRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Whatsapp['id']) {
    return this.whatsappRepository.findById(id);
  }

  findByIds(ids: Whatsapp['id'][]) {
    return this.whatsappRepository.findByIds(ids);
  }

  async update(
    id: Whatsapp['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateWhatsappDto: UpdateWhatsappDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.whatsappRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Whatsapp['id']) {
    return this.whatsappRepository.remove(id);
  }
}
