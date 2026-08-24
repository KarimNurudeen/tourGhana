import functools
from typing import Any, Callable, Coroutine, TypeVar

from cachetools import TTLCache

from app.config import settings

T = TypeVar("T")

_cache: TTLCache = TTLCache(maxsize=256, ttl=settings.cache_ttl_seconds)


def cached(key: str) -> Callable[[Callable[..., Coroutine[Any, Any, T]]], Callable[..., Coroutine[Any, Any, T]]]:
    """Cache an async function's result under a fixed key for cache_ttl_seconds.

    Content changes rarely (it's edited by hand in Strapi's admin), so a
    short TTL cache in front of every Strapi call avoids hitting it on every
    single Next.js page request without needing real invalidation logic.
    """

    def decorator(fn: Callable[..., Coroutine[Any, Any, T]]) -> Callable[..., Coroutine[Any, Any, T]]:
        @functools.wraps(fn)
        async def wrapper(*args: Any, **kwargs: Any) -> T:
            cache_key = (key, args, tuple(sorted(kwargs.items())))
            if cache_key in _cache:
                return _cache[cache_key]
            result = await fn(*args, **kwargs)
            _cache[cache_key] = result
            return result

        return wrapper

    return decorator
