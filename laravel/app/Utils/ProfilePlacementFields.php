<?php

namespace App\Utils;

final class ProfilePlacementFields
{
    /** @var list<string> */
    public const PROFILE_PLACEMENT_VARIABLES = [
        '{{prof_division}}',
        '{{prof_first}}',
        '{{prof_middle}}',
        '{{prof_last}}',
        '{{prof_email}}',
        '{{prof_designation}}',
    ];

    /**
     * @return array{firstName: string, middleInitial: string, lastName: string}
     */
    public static function parseDisplayName(string $name): array
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];
        $parts = array_values(array_filter($parts));
        if ($parts === []) {
            return ['firstName' => '', 'middleInitial' => '', 'lastName' => ''];
        }
        if (count($parts) === 1) {
            return ['firstName' => $parts[0], 'middleInitial' => '', 'lastName' => ''];
        }
        if (count($parts) === 2) {
            return ['firstName' => $parts[0], 'middleInitial' => '', 'lastName' => $parts[1]];
        }

        return [
            'firstName' => $parts[0],
            'middleInitial' => substr(str_replace('.', '', $parts[1]), 0, 1),
            'lastName' => implode(' ', array_slice($parts, 2)),
        ];
    }

    /**
     * @param  array{name?: string, email?: string, division?: string, firstName?: string, middleInitial?: string, lastName?: string, designation?: string}  $profile
     * @return array<string, string>
     */
    public static function buildRequesterProfileAnswerValues(array $profile): array
    {
        $firstName = trim((string) ($profile['firstName'] ?? ''));
        $middleInitial = trim((string) ($profile['middleInitial'] ?? ''));
        $lastName = trim((string) ($profile['lastName'] ?? ''));

        if ($firstName === '' && $lastName === '' && trim((string) ($profile['name'] ?? '')) !== '') {
            $parsed = self::parseDisplayName((string) $profile['name']);
            $firstName = $parsed['firstName'];
            $middleInitial = $middleInitial !== '' ? $middleInitial : $parsed['middleInitial'];
            $lastName = $parsed['lastName'];
        }

        return [
            '{{prof_division}}' => trim((string) ($profile['division'] ?? '')),
            '{{prof_first}}' => $firstName,
            '{{prof_middle}}' => $middleInitial,
            '{{prof_last}}' => $lastName,
            '{{prof_email}}' => trim((string) ($profile['email'] ?? '')),
            '{{prof_designation}}' => trim((string) ($profile['designation'] ?? '')),
        ];
    }

    /**
     * @param  array{name?: string, email?: string, division?: string}  $profile
     * @param  array<string, mixed>  $answers
     * @return array<string, mixed>
     */
    public static function mergeRequesterProfileIntoAnswers(array $profile, array $answers): array
    {
        return array_merge(self::buildRequesterProfileAnswerValues($profile), $answers);
    }
}
