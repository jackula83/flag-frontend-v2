import { Injectable } from "@nestjs/common";
import { HttpClient } from "./httpClient.service";

@Injectable()
export class BasicHttpClient extends HttpClient {}