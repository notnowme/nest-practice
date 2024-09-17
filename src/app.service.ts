import { Injectable } from '@nestjs/common';


// 의존성 주입
// service에 명시해주면 nest di에서 의존성 관리?를 하는 것 같음
// 실제로 로직을 처리하는 역할을 함
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
