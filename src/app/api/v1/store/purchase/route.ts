import { JWTSigner } from "@/lib/jwt/jwt_signer";
import { APIError } from "../../../../../lib/error/api_error";
import { DataError } from "../../../../../lib/error/data_error";
import { Authorize } from "../../../../../lib/route_method";
import { validateRequest } from "../../../../../lib/validate_request";
import { AAACECRole } from "../../../../domain/aaacec_roles";
import { BuyItemDTO } from "./purchase.dto";
import { Purchase } from "@/app/domain/purchase";
import { StoreRepository } from "@/app/repositories/store_repository";

class PurchaseController {
  @Authorize([AAACECRole.ADMIN, AAACECRole.WORKER])
  static async POST(req: Request) {
    try {
      const body = await req.json();
      const dto = await validateRequest(
        body,
        BuyItemDTO.schema,
        BuyItemDTO.fromObject
      );
      const payload = await PurchaseController.getUsernameFromToken(req);
      const storeItem = await StoreRepository.getStoreItem(dto.itemId);
      
      const currentScore = await StoreRepository.buyItem(
        dto.guest,
        storeItem,
      );
      await StoreRepository.addPurchase(new Purchase(dto.guest, payload.username, dto.itemId));
      return Response.json(
        { message: `Item bought succesfully! Remaining score: ${currentScore}` },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
      if (error instanceof DataError) {
        return Response.json({ message: error.message }, { status: 500 });
      }
      console.log(error);
      return Response.json({ message: "Unknown error" }, { status: 500 });
    }
  }

  private static async getUsernameFromToken(req: Request) {
    const auth_token = req.headers.get("Authorization")!;
    const token = auth_token.replace("Bearer ", "");
    const payload = await JWTSigner.verify(token);
    return payload;
  }
}

export function POST(req: Request) {
  return PurchaseController.POST(req);
}
