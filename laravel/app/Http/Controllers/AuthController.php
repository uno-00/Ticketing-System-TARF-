<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JwtService;
use App\Support\ApiException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct(private JwtService $jwt) {}

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:1',
        ]);
        if ($validator->fails()) {
            throw new ApiException(422, $validator->errors()->first());
        }

        $email = strtolower((string) $request->input('email'));
        $user = User::query()->where('email', $email)->first();
        if (! $user || ! $user->active || ! Hash::check((string) $request->input('password'), $user->password_hash)) {
            throw new ApiException(401, 'Invalid credentials');
        }

        return response()->json([
            'token' => $this->jwt->sign($user),
            'user' => $user->toPublicUser(),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $this->authUser($request)->toPublicArray(),
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:1|max:120',
            'division' => 'required|string|min:1|max:120',
        ]);
        if ($validator->fails()) {
            throw new ApiException(422, $validator->errors()->first());
        }

        $auth = $this->authUser($request);
        $user = User::query()->find($auth->id);
        if (! $user || ! $user->active) {
            throw new ApiException(404, 'User not found');
        }

        $user->name = trim((string) $request->input('name'));
        $user->division = trim((string) $request->input('division'));
        $user->save();

        return response()->json(['user' => $user->toPublicUser()]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'currentPassword' => 'required|string|min:1',
            'newPassword' => 'required|string|min:6|max:128',
        ]);
        if ($validator->fails()) {
            throw new ApiException(422, $validator->errors()->first());
        }

        $auth = $this->authUser($request);
        $user = User::query()->find($auth->id);
        if (! $user || ! $user->active) {
            throw new ApiException(404, 'User not found');
        }

        if (! Hash::check((string) $request->input('currentPassword'), $user->password_hash)) {
            throw new ApiException(400, 'Current password is incorrect');
        }

        if ($request->input('currentPassword') === $request->input('newPassword')) {
            throw new ApiException(400, 'New password must be different from the current password');
        }

        $user->password_hash = Hash::make((string) $request->input('newPassword'));
        $user->save();

        return response()->json(['ok' => true]);
    }
}
