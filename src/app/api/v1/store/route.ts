import { NextRequest } from "next/server";
import { APIError } from "../../../../lib/error/api_error";
import { Authorize } from "../../../../lib/route_method";
import { validateRequest } from "../../../../lib/validate_request";
import { AAACECRole } from "../../../domain/aaacec_roles";
import { StoreItem } from "../../../domain/store_item";
import { StoreRepository } from "../../../repositories/store_repository";
import { NewStoreItemDTO } from "./store.dto";
import { randomUUID } from "crypto";

class StorageController {
  @Authorize([AAACECRole.ADMIN])
  static async POST(req: Request) {
    const body = await req.json();
    try {
      const dto = await validateRequest(
        body,
        NewStoreItemDTO.schema,
        NewStoreItemDTO.fromObject
      );
      const id = randomUUID();
      await StoreRepository.addStoreItem(
        new StoreItem(
          id,
          dto.description,
          dto.price,
          dto.imageUrl,
          dto.partyId,
        )
      );
      return Response.json(
        { message: "Item added successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
    }
  }

  static async GET(req: NextRequest) {
    try {
      if (req.nextUrl.searchParams.has("partyId")) {
        const partyId = req.nextUrl.searchParams.get("partyId");
        const challenges = await StoreRepository.getItems(partyId!);
        challenges.sort((a, b) => a.price - b.price);
        return Response.json({ challenges }, { status: 200 });
      }
      throw new APIError("Please provide a partyId as a query parameter.", 400);
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
    }
  }
}

export async function POST(request: Request) {
  return await StorageController.POST(request);
}

export async function GET(request: NextRequest) {
  return await StorageController.GET(request);
}
