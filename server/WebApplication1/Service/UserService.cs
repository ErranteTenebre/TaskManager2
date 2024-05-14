using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Azure.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Core.Repositories;
using TaskManager.EntityFramework.Repositories;
using TaskManager.RestAPI.Helpers;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Repositories;

namespace WebApplication1.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshSessionRepository _refreshSessionRepository;
        private readonly JwtService _jwtService;

        public UserService(IUserRepository userRepository, JwtService jwtService, IRefreshSessionRepository refreshSessionRepository)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _refreshSessionRepository = refreshSessionRepository;
        }

        public async Task<User> GetByEmail(string email)
        {
            return await _userRepository.GetByEmail(email);
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<(string accessToken, string refreshToken, int expireTime)> Login(string email, string password, string fingerprint)
        {
            User user = await _userRepository.GetByEmail(email);

            if (user == null || user.Password != password) throw new InvalidOperationException("Неверный логин или пароль");

            string accessToken = _jwtService.GenerateAccessToken(user.Id, user.Email);

            string refreshToken = _jwtService.GenerateRefreshToken(user.Id, user.Email);

            int expireTime = _jwtService._accessTokenExpireTime;

            await _refreshSessionRepository.Create(user.Id, refreshToken, fingerprint);

            return (accessToken, refreshToken, expireTime);
        }

        public async Task LogOut(string refreshToken)
        {
            RefreshSession refreshSession = await _refreshSessionRepository.Get(refreshToken);

            await _refreshSessionRepository.Delete(refreshSession);
        }

        public async Task<(string AccessToken, string NewRefreshToken, DateTime AccessTokenExpiration)> Refresh(string refreshToken, string fingerprint)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new BadHttpRequestException("нет рефреш токена", 500);
            }

            RefreshSession refreshSession = await _refreshSessionRepository.Get(refreshToken);

            if (refreshSession == null)
            {
                throw new BadHttpRequestException("нет сессии", 500);
            }

            if (refreshSession.FingerPrint != fingerprint)
            {
                throw new BadHttpRequestException("Фингерпринт", 500);
            }

            await _refreshSessionRepository.Delete(refreshSession);

            try
            {
                JwtSecurityToken token = _jwtService.VerifyRefreshToken(refreshToken);

                (int userId, string email) = _jwtService.GetJwtTokenClaims(token);

                string accessToken = _jwtService.GenerateAccessToken(userId, email);

                string newRefreshToken = _jwtService.GenerateRefreshToken(userId, email);

                await _refreshSessionRepository.Create(userId, newRefreshToken, fingerprint);

                return (accessToken, newRefreshToken, DateTime.UtcNow.AddHours(1)); // Замените срок действия токена
            }
            catch (Exception ex)
            {
                throw new BadHttpRequestException(ex.Message, 500);
            }
        }

        public async Task<(string accessToken, string refreshToken, int expireTime)> Register(string email, string password, string login, string fingerprint)
        {
            User user = await _userRepository.GetByEmail(email);

            if (user != null) throw new InvalidOperationException("Пользователь с указанным email уже существует"); //Если пользователь уже существует

            user = await _userRepository.Create(email, password, login);

            string accessToken = _jwtService.GenerateAccessToken(user.Id, user.Email);

            string refreshToken = _jwtService.GenerateRefreshToken(user.Id, user.Email);

            int expireTime = _jwtService._accessTokenExpireTime;

            await _refreshSessionRepository.Create(user.Id, refreshToken, fingerprint);

            return (accessToken, refreshToken, expireTime);
        }


    }
}
